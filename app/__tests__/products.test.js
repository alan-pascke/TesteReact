import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Products from "../components/Products";

// Mock fetch for testing
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            name: "PNEU 205/65R15 94V RXMOTION H12 ROADX",
            image:
              "https://rspneus.com.br/wp-content/uploads/2023/04/PNEU-ROADX-RXMOTION-H12-1-640x640-1.jpg",
            model: "RXMOTION H12",
            treadwear: 360,
            traction: "A",
            temperature: "A",
            pattern: "ASSIMÉTRICO",
            loadIndex: "94 (670 Kg)",
            speedRating: "V (240km/h)",
            noise: 72,
            rollingResistance: "c",
            wetGrip: "c",
            cars: ["Chevrolet Onix", "Hyundai HB20", "Volkswagen Gol"],
          },
          {
            name: "PNEU 225/50R17 98W RXMOTION U11 ROADX",
            image:
              "https://rspneus.com.br/wp-content/uploads/2023/04/PNEU-ROADX-RXMOTION-U11-1-640x640-1.jpg",
            model: "RXMOTION U11",
            treadwear: 280,
            traction: "AA",
            temperature: "A",
            pattern: "ASSIMÉTRICO",
            loadIndex: "98 (750 Kg)",
            speedRating: "W (270km/h)",
            noise: 72,
            rollingResistance: "c",
            wetGrip: "e",
            cars: ["Chevrolet Cruze", "Ford Fusion", "Honda Civic"],
          },
          {
            name: "PNEU 235/50R18 101W RXMOTION U11 ROADX",
            image:
              "https://rspneus.com.br/wp-content/uploads/2023/04/PNEU-ROADX-RXMOTION-U11-1-640x640-1.jpg",
            model: "RXMOTION U11",
            treadwear: 280,
            traction: "AA",
            temperature: "A",
            pattern: "ASSIMÉTRICO",
            loadIndex: "101 (825 Kg)",
            speedRating: "W (270km/h)",
            noise: 72,
            rollingResistance: "c",
            wetGrip: "b",
            cars: ["Audi A4", "BMW Série 3", "Mercedes-Benz Classe C"],
          },
          {
            name: "PNEU 185/55R15 82V RXMOTION H12 ROADX",
            image:
              "https://rspneus.com.br/wp-content/uploads/2023/04/PNEU-ROADX-RXMOTION-H12-1-640x640-1.jpg",
            model: "RXMOTION H12",
            treadwear: 360,
            traction: "A",
            temperature: "A",
            pattern: "ASSIMÉTRICO",
            loadIndex: "82 (475 Kg)",
            speedRating: "V (240km/h)",
            noise: 72,
            rollingResistance: "c",
            wetGrip: "e",
            cars: ["Chevrolet Prisma", "Fiat Argo", "Volkswagen Polo"],
          },
          {
            name: "PNEU 235/55R18 104W RXQUEST SU01 ROADX",
            image:
              "https://rspneus.com.br/wp-content/uploads/2023/04/PNEU-ROADX-RXMOTION-SU01-1-640x640-1.jpg",
            model: "RXQUEST SU01",
            treadwear: 280,
            traction: "AA",
            temperature: "A",
            pattern: "ASSIMÉTRICO",
            loadIndex: "104 (900 Kg)",
            speedRating: "W (270km/h)",
            noise: 72,
            rollingResistance: "b",
            wetGrip: "e",
            cars: ["Audi Q3", "BMW X1", "Mercedes-Benz GLA"],
          },
        ]),
    })
  );
});

describe("Products", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("mostra um input", async () => {
    render(<Products />);

    const input = await waitFor(() =>
      screen.getByPlaceholderText("Pesquisar produtos")
    );

    expect(input).toBeInTheDocument();
  });

  it("mostra todos os produtos caso não há nenhuma pesquisa", async () => {
    render(<Products />);

    const results = await waitFor(() => screen.getAllByTestId("product"));
    expect(results.length).toBe(5);
  });

  it("mostra os produtos que contém a palavra pesquisada", async () => {
    render(<Products />);

    const input = await waitFor(() =>
      screen.getByPlaceholderText("Pesquisar produtos")
    );

    fireEvent.change(input, { target: { value: "RXMOTION H12" } });

    const results = await waitFor(() => screen.getAllByTestId("product"));

    expect(results.length).toBe(2);

    fireEvent.change(input, { target: { value: "RXMOTION U11" } });

    const results2 = await waitFor(() => screen.getAllByTestId("product"));

    expect(results2.length).toBe(2);
  });

  it("mostra mensagem de erro caso não encontre nenhum produto", async () => {
    render(<Products />);

    const input = await waitFor(() =>
      screen.getByPlaceholderText("Pesquisar produtos")
    );

    fireEvent.change(input, { target: { value: "RXMOTION H13" } });

    const error = await waitFor(() =>
      screen.getByText("Nenhum produto encontrado")
    );

    expect(error).toBeInTheDocument();
  });

  it("mostra filtro aditivo corretamente", async () => {
    render(<Products />);

    const input = await waitFor(() =>
      screen.getByPlaceholderText("Pesquisar produtos")
    );

    fireEvent.change(input, { target: { value: "235/55 SU01" } });

    const results = await waitFor(() => screen.getAllByTestId("product"));

    expect(results.length).toBe(1);
  });

  it("DESAFIO: mostra pesquisa correta por carros", async () => {
    render(<Products />);

    const input = await waitFor(() =>
      screen.getByPlaceholderText("Pesquisar produtos")
    );

    fireEvent.change(input, { target: { value: "BMW X1" } });

    const results = await waitFor(() => screen.getAllByTestId("product"));

    expect(results.length).toBe(1);

    fireEvent.change(input, { target: { value: "Chevrolet" } });

    const results2 = await waitFor(() => screen.getAllByTestId("product"));

    expect(results2.length).toBe(3);
  });
});
