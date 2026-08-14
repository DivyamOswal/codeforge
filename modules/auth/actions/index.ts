"use server"

import { prisma } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'

// onboarding of new or existing user
export const onBoardUser = async() => {
  try {
    const user = await currentUser();

    if (!user) {
      return { success: false, error: "No authenticated user found" };
    }

    const { id, firstName, lastName, imageUrl, emailAddresses } = user;
    const email = emailAddresses[0]?.emailAddress;

    if (!email) {
      return { success: false, error: "User has no email address" };
    }

    const newUser = await prisma.user.upsert({
      where: {
        clerkId: id,
      },
      update: {
        firstName: firstName || null,
        lastName: lastName || null,
        imageUrl: imageUrl || null,
        email,
      },
      create: {
        clerkId: id,
        firstName: firstName || null,
        lastName: lastName || null,
        imageUrl: imageUrl || null,
        email,
      },
    });

    return { success: true, user: newUser };
  } catch (err) {
    console.error("onBoardUser failed:", err);
    return { success: false, error: "Failed to onboard user" };
  }
};

// User current role
export const currentRole = async() => {
  try {
    const user = await currentUser();

    if (!user) {
      return { success: false, error: "No authenticated user found" };
    }

    const { id } = user;

    const result = await prisma.user.findUnique({
      where: {
        clerkId: id,
      },
      select: {
        role: true,
      },
    });

    if (!result) {
      return { success: false, error: "User not found in database" };
    }

    return { success: true, role: result.role };
  } catch (err) {
    console.error("currentRole failed:", err);
    return { success: false, error: "Failed to fetch user role" };
  }
};

// Get the current user data

export const getCurrentUserData = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return { success: false, error: "No authenticated user found" };
    }

    const data = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    if (!data) {
      return { success: false, error: "User not found in database" };
    }

    return { success: true, user: data };
  } catch (err) {
    console.error("getCurrentUserData failed:", err);
    return { success: false, error: "Failed to fetch user data" };
  }
};