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

const Company = ({ company }) => {
    const classes = useStyles();
    if (company) {
        return <h3 className={classes.textCenter}>
            <i>{company}</i>
        </h3>
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

const Role = ({ roleDescription }) => {
    const classes = useStyles();
    if (roleDescription) {
        return (
            <>
                <RichText paragraph={roleDescription} />
            </>
        )
    } else {
        return null;
    }
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

const Experience = ({ experience }) => {
    return (
        <Box>
            <Company company={experience.company} />
            <br></br>
            <Location location={experience.location} />
            <Interval beginDate={experience.begin} endDate={experience.end} />
            <ExperienceDivider experience={experience} />
            <Role roleDescription={experience.role} />
        </Box >
    )
}

const Experiences = ({ experiences }) => {
    if (experiences.length) {
        return (
            <>
                {experiences.map((experience, index) => {
                    return (
                        <Box mb={2}>
                            <Card>
                                <CardContent>
                                    <Experience experience={experience} key={index} />
                                    {/* {(index < experiences.length - 1) && <Divider />} */}
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

export default Experiences;