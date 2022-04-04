import React from "react";
import { shallow } from "enzyme";
import { BuscaIncrementalServidores } from "../../BuscaIncrementalServidores";
import { AutoComplete } from "primereact/autocomplete";

describe("<BuscaIncrementalServidores>", () => {
  it("renders without crashing", () => {
    shallow(<BuscaIncrementalServidores />);
  });

  it("uses an AutoComplete component", () => {
    const component = shallow(<BuscaIncrementalServidores />);
    expect(component.find(AutoComplete).length).toBe(1);
  });

  it("uses the placeholder parameter", () => {
    const component = shallow(
      <BuscaIncrementalServidores placeholder="teste" />,
    );
    const autoComplete = component.find(AutoComplete);
    expect(autoComplete.props().placeholder).toBe("teste");
  });
});
