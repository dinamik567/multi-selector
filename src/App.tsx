import { useState } from "react";
import { Multiselect } from "./components/Multiselect";
import { timeZone } from "./defaultSettings";
import { SelectOptionI } from "./types";

function App() {
  const [selectTimeZone, setSelectTimeZone] = useState<SelectOptionI[]>([]);

  return (
    <main>
      <Multiselect
        options={timeZone}
        selectedOptions={selectTimeZone}
        onSelectionChange={setSelectTimeZone}
        placeholder="поиск"
      />
    </main>
  );
}

export default App;
