import { Avatar as MuiAvatar } from "@material-ui/core";
import { getAvatarFromName } from "../modules/avatars";
import { getBackendUrl } from "../modules/urls";

const Avatar = ({ user, ...rest }) => {
  const backendUrl = getBackendUrl();
  if (user) {
    if (user.url) {
      return (
        <MuiAvatar
          alt={`${user.firstname} ${user.lastname}`}
          src={`${backendUrl}${user.url}`}
          {...rest}
        />
      );
    } else {
      return (
        <MuiAvatar alt={`${user.firstname} ${user.lastname}`} {...rest}>
          {getAvatarFromName(user.firstname, user.lastname)}
        </MuiAvatar>
      );
    }
  } else {
    return null;
  }
};

export default Avatar;
