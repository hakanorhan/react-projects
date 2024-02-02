/**
 * Important attributes for register.
 */

import RegisterPersonInfo from "./RegisterPersonInfo.js";
import WhoCreateDelete from "./WhoCreateDelete.js";

interface RegisterAdminRequest {
    // admin
    personinfo: RegisterPersonInfo,
    whoCreateDelete : WhoCreateDelete
}

export default RegisterAdminRequest;