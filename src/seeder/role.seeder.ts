import { createConnection, getManager } from "typeorm";
import { Permission } from "../entity/permission.entity";
import { Role } from "../entity/role.entity";

createConnection().then(async connection => {
    const permissionRepository = getManager().getRepository(Permission);

    const permissions = ['view_users','edit_users','view_roles','edit_roles','view_products','edit_products','view_orders','edit_orders'];

    let permissionsArr = [];
    for(let i = 0; i < permissions.length; i++) {
        permissionsArr.push(
            await permissionRepository.save({
                name: permissions[i]
            })
        );
    }

    const roleRepository = getManager().getRepository(Role);

    await roleRepository.save({
        name: 'Admin',
        permissions: permissionsArr
    });

    delete permissionsArr[3];

    await roleRepository.save({
        name: 'Editor',
        permissions: permissionsArr
    });

    delete permissionsArr[1];
    delete permissionsArr[5];
    delete permissionsArr[7];

    await roleRepository.save({
        name: 'Viewer',
        permissions: permissionsArr
    });

    process.exit(0);
});