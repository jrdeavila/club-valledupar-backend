import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

export default function Searcheable({
    value: val,
    datalist,
    onChange,
    ...props
}) {
    const inputRef = useRef();

    const [value, setValue] = useState(val);
    const [text, setText] = useState("");
    const [searchItems, setSearchItems] = useState(datalist);
    const [showDataList, setShowDataList] = useState(false);

    useEffect(() => {
        const handleClickInside = (e) => {
            if (inputRef.current && inputRef.current.contains(e.target)) {
                setShowDataList(true);
            } else {
                setShowDataList(false);
            }
        };

        document.addEventListener("click", handleClickInside);

        return () => {
            document.removeEventListener("click", handleClickInside);
        };
    }, []);

    useEffect(() => {
        let find = datalist.filter((e) => e.props.value == value);
        if (find.length > 0) {
            setText(find[0].props.text);
        }
        onChange && onChange(value);
    }, [value, val]);

    const handleOnChangeValue = ({ value, text }) => {
        setValue(value);
        setText(text);
    };

    const handleOnSearching = (value) => {
        setText(value);
        let filterList = datalist.filter((e) =>
            e.props.defaultValue.toLowerCase().includes(value.toLowerCase())
        );
        if (filterList.length > 0 && showDataList) {
            setSearchItems(filterList);
        } else if (filterList.length > 0 && !showDataList) {
            setSearchItems(filterList);
            setShowDataList(true);
        } else {
            setShowDataList(false);
        }
    };

    return (
        <div className="relative group">
            <div className="relative">
                <input
                    ref={inputRef}
                    {...props}
                    value={text}
                    onChange={(e) => handleOnSearching(e.target.value)}
                    type="text"
                    className="data-list peer w-30 h-10 rounded-md bg-white cursor-pointer outline-none text-gray-700
                border-gray-300
           pl-2 pr-7 focus:border-primary  focus:ring-primary font-bold transition-all duration-300 text-sm text-overflow-ellipsis w-full"
                />
                <FontAwesomeIcon
                    icon={faCaretRight}
                    className="absolute top-1/4 right-3 text-xl transition-transform transform duration-300 group-hover:rotate-90"
                />
            </div>
            <div
                style={{
                    width: "20rem",
                    height: "15rem",
                }}
                className={`absolute z-50 top-14 bg-white h-64 overflow-y-scroll shadow-lg ${
                    showDataList ? "scale-100" : "scale-0"
                } transition-transform duration-400 transform origin-top-left`}
            >
                {searchItems.map((e, i) => (
                    <div
                        key={i}
                        onClick={() => {
                            handleOnChangeValue({
                                value: e.props.value,
                                text: e.props.text,
                            });
                        }}
                    >
                        {e}
                    </div>
                ))}
            </div>
        </div>
    );
}

export const SearcheableItem = ({ value, text, index: i, children }) => {
    return (
        <div
            value={value}
            defaultValue={text}
            className={`${
                i % 2 == 0 ? "bg-gray-200" : "bg-white"
            } hover:bg-gray-300 px-3 py-2`}
        >
            {children}
        </div>
    );
};
