// @flow

import React, { Component } from "react";

import { isMobileBrowser } from "../../../base/environment/utils";
import { translate } from "../../../base/i18n";
import { IconArrowUp } from "../../../base/icons";
import { connect } from "../../../base/redux";
import { ToolboxButtonWithIcon } from "../../../base/toolbox/components";
import { getLocalJitsiVideoTrack } from "../../../base/tracks";
import { VideoSettingsPopup, toggleVideoSettings } from "../../../settings";
import { getVideoSettingsVisibility } from "../../../settings/functions";
import { isVideoSettingsButtonDisabled } from "../../functions";
import VideoMuteButton from "../VideoMuteButton";

type Props = {
    /**
     * The button's key.
     */
    buttonKey?: string,

    /**
     * External handler for click action.
     */
    handleClick: Function,

    /**
     * Click handler for the small icon. Opens video options.
     */
    onVideoOptionsClick: Function,

    /**
     * Indicates whether video permissions have been granted or denied.
     */
    hasPermissions: boolean,

    /**
     * Whether there is a video track or not.
     */
    hasVideoTrack: boolean,

    /**
     * If the button should be disabled.
     */
    isDisabled: boolean,

    /**
     * Notify mode for `toolbarButtonClicked` event -
     * whether to only notify or to also prevent button click routine.
     */
    notifyMode?: string,

    /**
     * Flag controlling the visibility of the button.
     * VideoSettings popup is currently disabled on mobile browsers
     * as mobile devices do not support capture of more than one
     * camera at a time.
     */
    visible: boolean,

    /**
     * Used for translation.
     */
    t: Function,

    /**
     * Defines is popup is open.
     */
    isOpen: boolean,
};

/**
 * Button used for video & video settings.
 *
 * @returns {ReactElement}
 */
class VideoSettingsButton extends Component<Props> {
    /**
     * Initializes a new {@code VideoSettingsButton} instance.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this._onEscClick = this._onEscClick.bind(this);
        this._onClick = this._onClick.bind(this);
    }

    /**
     * Returns true if the settings icon is disabled.
     *
     * @returns {boolean}
     */
    _isIconDisabled() {
        const { hasPermissions, hasVideoTrack, isDisabled } = this.props;

        return (!hasPermissions || isDisabled) && !hasVideoTrack;
    }
    _onEscClick: (KeyboardEvent) => void;

    /**
     * Click handler for the more actions entries.
     *
     * @param {KeyboardEvent} event - Esc key click to close the popup.
     * @returns {void}
     */
    _onEscClick(event) {
        if (event.key === "Escape" && this.props.isOpen) {
            event.preventDefault();
            event.stopPropagation();
            this._onClick();
        }
    }

    _onClick: () => void;

    /**
     * Click handler for the more actions entries.
     *
     * @returns {void}
     */
    _onClick() {
        if (!this.props.isOpen) {
            const { onVideoOptionsClick } = this.props;
            setTimeout(() => {
                const querySelect = document.querySelectorAll(".Popover");
                querySelect.length &&
                    document
                        .querySelectorAll(".Popover")
                        [querySelect.length == 2 ? 0 : 1].remove();
            });
            onVideoOptionsClick();
        }
    }

    /**
     * Implements React's {@link Component#render}.
     *
     * @inheritdoc
     */
    render() {
        const { t, visible, isOpen, buttonKey, notifyMode ,clientWidth} = this.props;

        return clientWidth > 1024 ? (
            <VideoSettingsPopup>
                <ToolboxButtonWithIcon
                    ariaControls="video-settings-dialog"
                    ariaExpanded={isOpen}
                    ariaHasPopup={true}
                    ariaLabel={this.props.t("toolbar.videoSettings")}
                    buttonKey={buttonKey}
                    icon={IconArrowUp}
                    iconDisabled={this._isIconDisabled()}
                    iconId="video-settings-button"
                    iconTooltip={t("toolbar.videoSettings")}
                    notifyMode={notifyMode}
                    onIconClick={this._onClick}
                    onIconKeyDown={this._onEscClick}
                    // onVisible = {this.props.value}
                >
                    <VideoMuteButton
                        buttonKey={buttonKey}
                        notifyMode={notifyMode}
                    />
                </ToolboxButtonWithIcon>
            </VideoSettingsPopup>
        ) : (
            <VideoMuteButton buttonKey={buttonKey} notifyMode={notifyMode} />
        );
    }
}

/**
 * Function that maps parts of Redux state tree into component props.
 *
 * @param {Object} state - Redux state.
 * @returns {Object}
 */
function mapStateToProps(state) {
    const { permissions = {} } = state["features/base/devices"];
    const { isNarrowLayout } = state["features/base/responsive-ui"];
    const { clientWidth } = state['features/base/responsive-ui'];
    const audioSettingsVisible = state['features/settings'];
    return {
        hasPermissions: permissions.video,
        hasVideoTrack: Boolean(getLocalJitsiVideoTrack(state)),
        isDisabled: isVideoSettingsButtonDisabled(state),
        isOpen: getVideoSettingsVisibility(state),
        visible: !isMobileBrowser() && !isNarrowLayout,
        clientWidth: clientWidth,
        // value: audioSettingsVisible
    };
}

const mapDispatchToProps = {
    onVideoOptionsClick: toggleVideoSettings,
};

export default translate(
    connect(mapStateToProps, mapDispatchToProps)(VideoSettingsButton)
);
