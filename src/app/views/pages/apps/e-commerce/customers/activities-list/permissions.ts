export class PermissionService {
  private permissions: string[] = [];

  constructor() {}

  addPermission(permission: string) {
    this.permissions.push(permission);
  }

  hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }
}