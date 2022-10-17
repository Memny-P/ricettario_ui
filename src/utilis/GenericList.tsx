import { ReactElement } from "react";
import Loading from "./Loading";

export default function GenericList(props: genericListProps) {
    if (!props.list) {
        // Loading
        if (props.loadingUI) {
            return props.loadingUI;
        }
        return <Loading />;
    } else if (props.list.length === 0) {
        // no data
        if (props.emptyListUI) {
            return props.emptyListUI;
        }
        return <>There are no elements to display</>;

    } else {
        // display
        return props.children;
    }
}

interface genericListProps {
    list: any;
    loadingUI?: ReactElement;
    emptyListUI?: ReactElement;
    children: ReactElement;
}