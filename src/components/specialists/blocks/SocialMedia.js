import Link from "next/link";
import {
    Card, CardHeader, Divider, Box, CardContent, IconButton
} from "@material-ui/core";

import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';


const SocialMediaIcon = ({ socialNetwork }) => {
    if (socialNetwork === "LinkedIn") {
        return <LinkedInIcon />
    } else if (socialNetwork === "Github") {
        return <GitHubIcon />
    } else if (socialNetwork === "Facebook") {
        return <FacebookIcon />
    } else if (socialNetwork === "Instagram") {
        return <InstagramIcon />
    }
}

const SocialMedia = ({ socialAccounts, owner }) => {
    if (socialAccounts.length) {
        return (
            <Card>
                <CardHeader titleTypographyProps={{variant:'h3' }} title="Social Media" />
                <Divider />
                <CardContent>
                    <Box mt={2}>
                        {socialAccounts.map((account, index) => {
                            return (
                                <Link href={account.url} key={index}>
                                    <IconButton aria-label={`${owner.firstname} ${owner.lastname} ${account.socialNetwork}`}>
                                        <SocialMediaIcon socialNetwork={account.socialNetwork} />
                                    </IconButton>
                                </Link>
                            )
                        })}
                    </Box>
                </CardContent>
            </Card>
        )
    } else {
        return null;
    }

}

export default SocialMedia;