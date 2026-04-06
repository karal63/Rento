import { beforeEach, describe, expect, it } from 'vitest';
import { useUserStore } from '../../model/user.store';
import { hasPermission } from '../hasPermission';
import { createPinia, setActivePinia } from 'pinia';
import type { User } from '../../model/types';

describe('Permissions', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('authorized', () => {
        const store = useUserStore();

        store.user = {
            ...(store.user as User),
            roles: ['admin'],
        };
        expect(hasPermission('create:rental')).toBeTruthy();
    });

    it('unauthorized', () => {
        const store = useUserStore();

        store.user = {
            ...(store.user as User),
            roles: ['user'],
        };
        expect(hasPermission('create:rental')).toBeFalsy();
    });
});
