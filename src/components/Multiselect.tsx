import React, { FormEvent } from "react";
import { SelectOptionI } from "../types";
import { CheckboxItem } from "./UI/CheckboxItem";

interface MultiselectProps {
  placeholder: string;
  options: string[];
  selectedOptions: SelectOptionI[];
  onSelectionChange: (value: SelectOptionI[]) => void;
}

interface MultiselectState {
  searchInput: string;
  filteredOptions: string[];
  isOpenDropdown: boolean;
}

const selectedCollection = new Set();

export class Multiselect extends React.Component<
  MultiselectProps,
  MultiselectState
> {
  state = {
    searchInput: "",
    filteredOptions: this.props.options,
    isOpenDropdown: false,
  };

  constructor(props: MultiselectProps) {
    super(props);
  }

  handleChangeInputTimeZone = (
    e: FormEvent<HTMLInputElement>,
    value: string
  ) => {
    if (!e.currentTarget.checked) {
      const newArr = this.props.selectedOptions.filter(
        (item) => item.value !== value
      );
      this.props.onSelectionChange(newArr);
      //удаляем значение в set коллекцию
      selectedCollection.delete(value);
    } else {
      this.props.onSelectionChange([
        ...this.props.selectedOptions,
        { id: Date.now(), value },
      ]);
      //сохраняем значение в set коллекцию
      selectedCollection.add(value);
    }

    // console.log(this.props.selectedOptions);
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

  handleClickResetSelectedOptions = () => {
    this.props.onSelectionChange([]);
    // очищаем set коллекцию
    selectedCollection.clear();
  };

  filteredSearchOption = (value: string) => {
    const searchValue = value.trim().toLowerCase();
    const newArr = this.props.options.filter((item) =>
      item.toLowerCase().startsWith(searchValue)
    );

    this.setState((prev) => ({ ...prev, filteredOptions: newArr }));
  };

  handleClickOpenDropdown = () => {
    this.setState((prev) => ({
      ...prev,
      isOpenDropdown: !prev.isOpenDropdown,
    }));
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
        <div className="mt-5 flex justify-between items-center gap-2">
          <form className="flex gap-2 max-w-xl w-full border border-black p-2 rounded-xl">
            <label className="mr-12 pl-2" htmlFor="timezone-select">
              <input
                onChange={this.handleChangeSearchInput}
                className="outline-none"
                placeholder={this.props.placeholder}
                value={this.state.searchInput}
              />
            </label>
            <div
              onClick={this.handleClickOpenDropdown}
              className="relative w-full"
            >
              <div className="flex gap-2 justify-between items-end cursor-pointer">
                <div>Выбрать временную зону</div>
                <svg
                  className={`${
                    this.state.isOpenDropdown ? "rotate-180" : ""
                  } mr-5 ml-2 h-5 w-5`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <div
                className={`${
                  this.state.isOpenDropdown ? "block" : "hidden"
                } absolute top-[40px] h-40 overflow-y-auto overflow-x-hidden`}
              >
                {this.state.filteredOptions.map((item) => (
                  <CheckboxItem
                    value={item}
                    isChecked={selectedCollection.has(item)}
                    handleChange={this.handleChangeInputTimeZone}
                  />
                ))}
                {this.state.filteredOptions.length === 0 && "пусто"}
              </div>
            </div>
          </form>
          <button
            onClick={this.handleClickResetSelectedOptions}
            className="border border-black rounded-lg py-2 px-6"
          >
            Сброс
          </button>
        </div>
      </div>
    );
  }
}
