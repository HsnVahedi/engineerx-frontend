import {
    Card, CardHeader, Divider, Box, CardContent, Grid, makeStyles
} from "@material-ui/core";
import moment from "moment";
import RichText from "../../richtext";

const useStyles = makeStyles((theme) => ({
    textCenter: {
        textAlign: "center"
    }
}));

const Institution = ({ institution }) => {
    const classes = useStyles();
    if (institution) {
        return <h3 className={classes.textCenter}>
            <i>{institution}</i>
        </h3>
    } else {
        return null;
    }
}

const Degree = ({ degree }) => {
    const classes = useStyles();
    if (degree) {
        return <h4 className={classes.textCenter}>
            <i>{degree}</i>
        </h4>
    } else {
        return null;
    }
}

const Location = ({ location }) => {
    const classes = useStyles();
    if (location) {
        return <p>
            Location: <i>{location}</i>
        </p>
    } else {
        return null;
    }
}

const BeginDate = ({ begin }) => {
    const classes = useStyles();
    if (begin) {
        return <p>Begin: <i>{begin}</i></p>
    } else {
        return null;
    }
}

const EndDate = ({ end }) => {
    const classes = useStyles();
    if (end) {
        return <p>End: <i>{end}</i></p>
    } else {
        return null;
    }
}

const Interval = ({ beginDate, endDate }) => {
    const begin = beginDate ? moment(beginDate).format("MMM Do YYYY") : null;
    const end = endDate ? moment(endDate).format("MMM Do YYYY") : null;
    return (
        <>
            <BeginDate begin={begin} />
            <EndDate end={end} />
        </>
    )
}

const ExperienceDivider = ({ experience }) => {
    const classes = useStyles();
    if (experience.company || experience.location || experience.begin || experience.end) {
        if (experience.role) {
            return (
                <>
                    <br />
                    <p className={classes.textCenter}>
                        ------------------
                    </p>
                    <br />
                </>
            )
        } else {
            return null;
        }
    } else {
        return null;
    }

}

const Education = ({ education }) => {
    return (
        <Box>
            <Institution institution={education.institution} />
            <br></br>
            <Degree degree={education.degree} />
            <br></br>
            <Location location={education.location} />
            <Interval beginDate={education.begin} endDate={education.end} />
        </Box >
    )
}

const Educations = ({ educations }) => {
    if (educations.length) {
        return (
            <>
                {educations.map((education, index) => {
                    return (
                        <Box mb={2}>
                            <Card>
                                <CardContent>
                                    <Education education={education} key={index} />
                                </CardContent>
                            </Card>
                        </Box>
                    )
                })}
            </>
        );
    } else {
        return null;
    }

}

export default Educations;