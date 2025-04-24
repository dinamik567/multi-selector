import React, { FormEvent } from "react";
import { SelectOptionI } from "../types";

interface MultiselectProps {
  placeholder: string;
  options: string[];
  selectedOptions: SelectOptionI[];
  onSelectionChange: (value: SelectOptionI[]) => void;
}

export class Multiselect extends React.Component<MultiselectProps> {
  state = {
    searchInput: "",
    filteredOptions: this.props.options,
  };

  constructor(props: MultiselectProps) {
    super(props);
  }

  handleChangeSelectTimeZone = (e: FormEvent<HTMLSelectElement>) => {
    this.props.onSelectionChange([
      ...this.props.selectedOptions,
      { id: Date.now(), value: e.currentTarget.value },
    ]);
  };

  handleClickDeleteSelectedTimeZone = (id: number) => {
    const newArr = this.props.selectedOptions.filter((item) => item.id !== id);
    this.props.onSelectionChange(newArr);
  };

  handleChangeSearchInput = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    this.setState(
      (prev) => ({
        ...prev,
        searchInput: value,
      }),
      () => this.filteredSearchOption(value)
    );
  };

  filteredSearchOption = (value: string) => {
    const searchValue = value.trim().toLowerCase();
    const newArr = this.props.options.filter((item) =>
      item.toLowerCase().startsWith(searchValue)
    );

    this.setState((prev) => ({ ...prev, filteredOptions: newArr }));
  };

  render() {
    return (
      <div className="flex max-w-3xl mx-auto flex-col justify-center">
        <div className="flex border rounded-xl h-40 border-gray-700 p-2 gap-2 mt-20">
          <h2 className="text-lg w-1/5">Выбранные зоны:</h2>
          <div className=" w-4/5 overflow-y-auto">
            <div className="flex items-start justify-start gap-2 flex-wrap">
              {this.props.selectedOptions.map((item) => (
                <div
                  key={item.id}
                  className="flex h-9 border p-2 rounded-lg items-center gap-2"
                >
                  <div>{item.value}</div>
                  <button
                    onClick={() =>
                      this.handleClickDeleteSelectedTimeZone(item.id)
                    }
                    className="relative flex w-6 h-6 items-center justify-center bg-red-600 rounded-full after:absolute after:w-[2px] after:h-4/5 after:bg-slate-200 after:-rotate-45 before:absolute before:w-[2px] before:h-4/5 before:bg-slate-200 before:rotate-45"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <form className="max-w-xl w-full mt-5 mx-auto border border-black p-2 rounded-xl">
          <label className="pl-2" htmlFor="timezone-select">
            <input
              onChange={this.handleChangeSearchInput}
              className="outline-none"
              placeholder={this.props.placeholder}
              value={this.state.searchInput}
            />
          </label>
          <select
            onChange={this.handleChangeSelectTimeZone}
            name="timezone"
            id="timezone-select"
          >
            {this.state.filteredOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </form>
      </div>
    );
  }
}
