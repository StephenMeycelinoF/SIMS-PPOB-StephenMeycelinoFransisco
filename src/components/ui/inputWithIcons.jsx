import { useState } from "react";
import { Input as ShadcnInput } from "@/components/ui/input";

function InputWithIcons({
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  placeholder,
  value,
  onChange,
  name,
  id,
  type = "text",
  onClickRightIcon,
  error,
  ref
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <div className="relative">
        {LeftIcon && (
          <LeftIcon
            className={`absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 ${
              isFocused ? "text-red-500" : "text-gray-400"
            }`}
          />
        )}
        <ShadcnInput
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          ref={ref}
          className={`w-full border border-gray-200 p-5 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
            LeftIcon ? "pl-10" : "pl-3"
          } ${RightIcon ? "pr-10" : "pr-3"} rounded-lg`}
        />
        {RightIcon && (
          <RightIcon
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={onClickRightIcon}
          />
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default InputWithIcons;
