import clsx from "clsx";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { makeStyles } from "tss-react/mui";

import { getConferenceName } from "../../../base/conference/functions";
import { withPixelLineHeight } from "../../../base/styles/functions.web";
// eslint-disable-next-line lines-around-comment
// @ts-ignore
import { Tooltip } from "../../../base/tooltip";
import { Toolbox } from "../../../toolbox/components/web";
import ConferenceTimer from "../ConferenceTimer";

const useStyles = makeStyles()((theme) => {
    return {
        // container: {
        //     ...withPixelLineHeight(theme.typography.bodyLongRegular),
        //     color: theme.palette.text01,
        //     padding: '2px 16px',
        //     backgroundColor: 'rgba(0, 0, 0, 0.6)',
        //     maxWidth: '324px',
        //     boxSizing: 'border-box',
        //     height: '28px',
        //     borderRadius: `${theme.shape.borderRadius}px 0 0 ${theme.shape.borderRadius}px`,
        //     marginLeft: '2px',

        //     '@media (max-width: 300px)': {
        //         display: 'none'
        //     }
        // },
        mainContainer: {
            width: "588px",
            height: "125px",
            borderRadius: "24px",
            backgroundColor: theme.palette.ui01,
            "@media (max-width: 768px)": {
                backgroundColor: "transparent",
                position: "absolute",
                right: "-93px",
                height: "80px",
                top: "30px",
            },
            "@media screen and (min-width:768px) and (max-width: 1240px)": {
                margin:"0 auto",
                float:'none',
                maxWidth:"90%"
            },
        },
        container: {
            height: "100%",
            // position: "absolute",
            inset: "0 0 0 0",
            display: "flex",
            flexDirection: "column",
            zIndex: 252,
            "@media (max-width: 768px)": {
                flexDirection: "column",
            },
        },
        content: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            margin: "10px 0px 15px 0px",
        },
        toolboxweb: {
            marginLeft: "20px",
            "@media (max-width: 768px)": {
                display: "none",
            },
            "@media screen and (min-width:768px) and (max-width: 1240px)": {
                marginLeft: "0px !important",
            },
        },
        sub: {
            "@media (max-width: 768px)": {
                display: "none",
            },
        },

        subText: {
            padding: "8px 50px",
            color: "#000",
            backgroundColor: "#fff",
            fontSize: "15px",
            borderRadius: "10px",
            "@media (max-width: 1024px)": {
                padding: "3.3px 16px",
                backgroundColor: " rgba(0, 0, 0, 0.6)",
                color: " #fff",
                fontSize: "15px",
                borderRadius: "6px 0px 0px 6px",
            },
            "@media screen and (min-width:1024px) and (max-width: 1240px)": {
                padding: "8px 25px !important",
            },
        },
    };
});

/**
 * Label for the conference name.
 *
 * @returns {ReactElement}
 */
const SubjectText = () => {
    const subject = useSelector(getConferenceName);
    const { classes } = useStyles();
    const { t } = useTranslation()
    
    return (
        <>
            <div className={classes.mainContainer}>
                <div className={classes.container}>
                    <Tooltip content={subject} position="bottom">
                        <div
                            className={clsx(
                                "subject-text--content",
                                classes.content
                            )}
                        >
                            <div className={classes.sub}>
                                <h3>{t('chat.subject')} :</h3>
                            </div>
                            <div className={classes.subText}>{subject}</div>
                        </div>
                    </Tooltip>
                    <div className={classes.toolboxweb}>
                        <Toolbox />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubjectText;
