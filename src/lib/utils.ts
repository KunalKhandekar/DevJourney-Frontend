/**
 * Node modules
*/
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Types
*/
import type { User } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUsername(user: User):string {
  const { firstName, lastName, username } = user;
  return firstName || lastName ? [firstName, lastName].join(' '): username;
}

export function getReadingTime(content: string): number {
  const AVG_READING_WPM = 150;
  return Math.ceil(content.split(' ').length/ AVG_READING_WPM) 
}