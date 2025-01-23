import React, { useState } from "react";

interface Props {
    emails: string[]
    setEmails: (value: string[]) => void;
    teamMembers: string[];
    setError: (error: string) => void;
    inputValue: string;
    setInputValue: (value: string) => void
}

const EmailChipInput: React.FC<Props> = (props) => {
    const { emails, setEmails, teamMembers, setError, inputValue, setInputValue } = props

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            const trimmedValue = inputValue.trim();
            if (trimmedValue) {
                if (!validateEmail(trimmedValue)) {
                    setError("Invalid email format!")
                } else if (isDuplicate(trimmedValue)) {
                    setError("This email is already added!")
                } else {
                    setEmails([...emails, trimmedValue]);
                    setInputValue("");
                    setError("")
                }
            }
        }
    };

    const handleRemoveEmail = (email: string) => {
        setEmails(emails.filter((e) => e !== email));
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const testFlag = emailRegex.test(email)
        if (testFlag) {
            setError("")
        }
        else {
            setError("Invalid email format!")
        }
        return emailRegex.test(email);
    };

    const isDuplicate = (email: string) => {
        return emails.includes(email) || teamMembers.includes(email);
    };

    return (
        <div className="w-full">
            <div className="border rounded p-2 flex flex-wrap gap-2 bg-gray-50">
                {emails.map((email, index) => (
                    <div
                        key={index}
                        className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                    >
                        <span>{email}</span>
                        <button
                            type="button"
                            className="ml-2 text-blue-700 hover:text-red-500"
                            onClick={() => handleRemoveEmail(email)}
                        >
                            &times;
                        </button>
                    </div>
                ))}
                <input
                    type="text"
                    className="flex-1 border-none outline-none bg-transparent"
                    placeholder="Enter email and press Enter or Comma"
                    value={inputValue}
                    onChange={(e) => {
                        if (isDuplicate(e.target.value)) {
                            setError("This email is already added!")
                        }
                        else if (!validateEmail(e.target.value)) {
                            setError("Invalid email format")
                        }
                        else {
                            setError("")
                        }
                        setInputValue(e.target.value)
                    }}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
};

export default EmailChipInput;
