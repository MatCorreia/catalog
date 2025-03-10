export function UserName(name: string) {
    const names = name?.split(" ");
    const firstName = names[0];
    const lastName = names[names.length - 1];
  
    return `${firstName} ${lastName || ""}`;
  }