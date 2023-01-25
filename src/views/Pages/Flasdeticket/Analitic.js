import ReactGa from "react-ga";
import { resetCalls } from "react-ga";

const useAnalyticsEventTracker = (category = "Blog category") => {
    const eventTracker = (action = "test action", label = "test label") => {
        ReactGA.event({ category, action, label });
    }
    return eventTracker;
}
export default useAnalyticsEventTracker;

//0923980742
//if(idespacio=157 )