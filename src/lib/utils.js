export function formatMessageTime(date) {
    if (!date) return "Unknown Time"; // Handle missing date case

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
        console.error("Invalid date received:", date);
        return "Invalid Time"; // Return a fallback string
    }

    return parsedDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}
