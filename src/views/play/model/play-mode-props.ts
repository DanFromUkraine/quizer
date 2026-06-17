import { createPropsProvider } from '@/src/utils/createPropsProvider';

interface PlayModeProps {
    showAnswersImmediately: boolean;
    isCompleted: boolean;
    storyId: string;
}

export const {
    Provider: PlayCardsListProvider,
    usePropsContext: usePlayModeProps
} = createPropsProvider<PlayModeProps>('play cards list');
