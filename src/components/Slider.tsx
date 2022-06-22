import { useCallback } from "react";

interface props {
  controlName: string;
  value: number;
  onChange: VoidFunction;
}

export const Slider = ({ controlName, value, onChange }: props) => {
  const calcRangeThumbPos = useCallback(() => {
    return `${(value * 195) / 100}px`;
  }, [value]);
  return (
    <div className="slider_wrapper">
      <input
        type="range"
        min="0"
        max="100"
        name={controlName}
        className="slider"
        value={value}
        onChange={onChange}
      />
      <div style={{ left: calcRangeThumbPos() }} className="slider_thumb"></div>
      <span className="def_attack_val_wrapper">{value}</span>
    </div>
  );
};
