import { useState } from "react";

export default function useToggleState(isDefaultOn?: boolean): [boolean, () => void] {
    const [isOn, setOn] = useState(isDefaultOn || false);

    const toggle = () => {
        setOn((prev) => !prev);
    }

    return [
        isOn,
        toggle
    ]
}