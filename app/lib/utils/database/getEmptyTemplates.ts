import { Card } from '@/app/lib/types/mainDb';

export function getEmptyTemplates(id: string): Card {
        return {
                id,
                cardTitle: '',
                optionIds: []
        };
}
