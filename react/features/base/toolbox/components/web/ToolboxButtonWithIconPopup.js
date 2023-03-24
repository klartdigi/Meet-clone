// @flow

import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Icon } from "../../../icons";
import Popover from "../../../popover/components/Popover.web";

type Props = {
    /**
     * Whether the element popup is expanded.
     */
    ariaExpanded?: boolean,

    /**
     * The id of the element this button icon controls.
     */
    ariaControls?: string,

    /**
     * Whether the element has a popup.
     */
    ariaHasPopup?: boolean,

    /**
     * Aria label for the Icon.
     */
    ariaLabel?: string,

    /**
     * The decorated component (ToolboxButton).
     */
    children: React$Node,

    /**
     * Icon of the button.
     */
    icon: Function,

    /**
     * Flag used for disabling the small icon.
     */
    iconDisabled: boolean,

    /**
     * The ID of the icon button.
     */
    iconId: string,

    /**
     * Popover close callback.
     */
    onPopoverClose: Function,

    /**
     * Popover open callback.
     */
    onPopoverOpen: Function,

    /**
     * The content that will be displayed inside the popover.
     */
    popoverContent: React$Node,

    /**
     * Additional styles.
     */
    styles?: Object,

    /**
     * Whether or not the popover is visible.
     */
    visible: boolean,

    iconClick: Function,

};

declare var APP: Object;

/**
 * Displays the `ToolboxButtonWithIcon` component.
 *
 * @param {Object} props - Component's props.
 * @returns {ReactElement}
 */
export default function ToolboxButtonWithIconPopup(props: Props) {
    const {
        ariaControls,
        ariaExpanded,
        ariaHasPopup,
        ariaLabel,
        children,
        icon,
        iconDisabled,
        iconId,
        onPopoverClose,
        onPopoverOpen,
        popoverContent,
        styles,
        visible,
        iconClick,
    } = props;

    const iconProps = {};

    if (iconDisabled) {
        iconProps.className =
            "settings-button-small-icon settings-button-small-icon--disabled";
    } else {
        iconProps.className = "settings-button-small-icon";
        iconProps.role = "button";
        iconProps.tabIndex = 0;
        iconProps.ariaControls = ariaControls;
        iconProps.ariaExpanded = ariaExpanded;
        iconProps.containerId = iconId;
        iconProps.onClick = () => {
            iconClick();
        };
    }
    const clientWidth = useSelector(
        (state) => state["features/base/responsive-ui"].clientWidth
    );

    return (
        <div className="settings-button-container" styles={styles}>
            {children}
            {clientWidth >= 1024 && (
                <div className="settings-button-small-icon-container">
                    <Popover
                        content={popoverContent}
                        headingLabel={ariaLabel}
                        onPopoverClose = { onPopoverClose }
                        // onPopoverOpen = { onPopoverOpen }
                        position="bottom"
                        visible={visible} 
                        trigger="click"
                    >
                        <Icon
                            {...iconProps}
                            ariaHasPopup={ariaHasPopup}
                            ariaLabel={ariaLabel}
                            size={16}
                            src={icon}
                        />
                    </Popover>
                </div>
            )}
        </div>
    );
}
