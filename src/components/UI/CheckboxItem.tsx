import React from "react";

interface CheckboxItemProps {
  value: string;
  isChecked: boolean;
  handleChange: (e: React.FormEvent<HTMLInputElement>, value: string) => void;
}

export class CheckboxItem extends React.PureComponent<CheckboxItemProps> {
  constructor(props: CheckboxItemProps) {
    super(props);
  }
  render() {
    return (
      <label className="flex gap-2 cursor-pointer">
        <input
          onChange={(e) => this.props.handleChange(e, this.props.value)}
          checked={this.props.isChecked}
          type="checkbox"
        />
        <div>{this.props.value}</div>
      </label>
    );
  }
}
