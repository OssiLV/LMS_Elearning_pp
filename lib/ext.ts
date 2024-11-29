export function getInitials(name: string): string {
    const nameParts = name.split(" "); // Split the name by spaces
    const firstNameInitial = nameParts[0][0]; // Get the first letter of the first name
    const lastNameInitial = nameParts[nameParts.length - 1][0]; // Get the first letter of the last name

    return `${firstNameInitial}${lastNameInitial}`.toUpperCase(); // Return the initials as a string
}
export function maskEmail(email: string): string {
    // Get the index of the '@' symbol
    const atIndex = email.indexOf("@");

    // Get the first 4 characters of the local part
    const firstPart = email.substring(0, 4);

    // Get the last 4 characters of the local part (excluding the '@')
    const lastPart = email.substring(
        email.length - atIndex - 3,
        email.length - atIndex,
    );

    // Get the domain part (after '@')
    const domain = email.substring(atIndex);

    // Combine first 4 chars, '...' and last 4 chars, then add the domain
    return `${firstPart}...${lastPart}${domain}`;
}
