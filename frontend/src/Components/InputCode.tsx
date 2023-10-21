import { useMemo } from "react";
import "./InputCode.css";

const RE_DIGIT = new RegExp(/^\d+$/);

export type OTPProps = {
	value: string;
	valueLength: number;
	onChange: (value: string) => void;
}

export const OtpInputComponent = ({ value, valueLength, onChange } : OTPProps) : JSX.Element => {
	const valueItems = useMemo(() => {
		const valueArray = value.split("");
		const items: Array<string> = [];
		for (let i = 0; i < valueLength; i++) {
			const char = valueArray[i];
			if (RE_DIGIT.test(char))
				items.push(char);
			else
				items.push("");
		}
		return items;
	}, [value, valueLength]);

	const focusToNextInput = (target: HTMLElement) => {
		const nextElementSibling = target.nextElementSibling as HTMLInputElement | null;
		if (nextElementSibling)
			nextElementSibling.focus();
	};
	const focusToPrevInput = (target: HTMLElement) => {
		const previousElementSibling = target.previousElementSibling as HTMLInputElement | null;
		if (previousElementSibling)
			previousElementSibling.focus();
	};

	const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		let targetValue = e.currentTarget.value;
		targetValue = targetValue.trim();
		const isTargetValueDigit = RE_DIGIT.test(targetValue);
		if (!isTargetValueDigit && targetValue !== "")
			return;
		const nextInputElement = e.target.nextElementSibling as HTMLInputElement | null;
		if (!isTargetValueDigit && nextInputElement && nextInputElement.value !== "")
			return;
		targetValue = isTargetValueDigit ? targetValue : " ";
		console.log(targetValue.length);
		const targetValueLength = targetValue.length;
		if (targetValueLength === 1) {
			const newValue = value.substring(0, index) + targetValue + value.substring(index + 1);
			onChange(newValue);
			if (!isTargetValueDigit)
				return;
			focusToNextInput(e.currentTarget);
		}
		else if (targetValueLength === valueLength) {
			onChange(targetValue);
			e.currentTarget.blur();
		}
	};

	const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const target = e.currentTarget as HTMLInputElement;
		
		if (e.key === "ArrowRight" || e.key === "ArrowDown") {
			e.preventDefault();
			return focusToNextInput(target);
		}
		if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
			e.preventDefault();
			return focusToPrevInput(target);
		}
		const targetValue = target.value;
		target.setSelectionRange(0, targetValue.length);
		if (e.key !== "Backspace" || targetValue !== "")
			return;
		focusToPrevInput(target);
	};

	const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		const target = e.currentTarget;
		target.setSelectionRange(0, target.value.length);
	};

	return (
		<div className="otp-group">
			{
				valueItems.map((val, i) => (
					<input
						key={i}
						type="text"
						inputMode="numeric"
						autoComplete="one-time-code"
						pattern="\d{1}"
						maxLength={valueLength}
						className="otp-input"
						value={val}
						onChange={(e) => inputOnChange(e, i)}
						onKeyDown={onInputKeyDown}
						onFocus={inputOnFocus}
					/>
				))
			}
		</div>
	);
};