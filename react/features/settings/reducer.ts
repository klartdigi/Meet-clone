import ReducerRegistry from '../base/redux/ReducerRegistry';

import {
    SET_AUDIO_SETTINGS_VISIBILITY,
    SET_VIDEO_SETTINGS_VISIBILITY,
    SET_REACTION_SETTINGS_VISIBILITY,
} from './actionTypes';

export interface ISettingsState {
    audioSettingsVisible?: boolean;
    videoSettingsVisible?: boolean;
    reactionSettingsVisible?: boolean;
}

ReducerRegistry.register('features/settings', (state: ISettingsState = {}, action) => {
    switch (action.type) {
    case SET_AUDIO_SETTINGS_VISIBILITY:
        return {
            ...state,
            audioSettingsVisible: action.value
        };
    case SET_VIDEO_SETTINGS_VISIBILITY:
        return {
            ...state,
            videoSettingsVisible: action.value
        };
        case SET_REACTION_SETTINGS_VISIBILITY:
        return {
            ...state,
            reactionSettingsVisible: action.value
        };
    }

    return state;
});
