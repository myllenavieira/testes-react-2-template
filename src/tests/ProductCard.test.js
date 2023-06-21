import { render, screen } from "@testing-library/react"
import ProductCard from "../components/ProductsList/ProductCard"
import userEvent from "@testing-library/user-event"

const productMock = {
    id: "1",
    title: "Jaqueta",
    price: 55.99,
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
}

const addToCartMock = jest.fn()

describe("testes no ProductCard", () => {
    test("renderiza componente", () => {
        render(<ProductCard
            product={productMock}
            addToCart={addToCartMock}
        />)
        screen.debug()
    })
    test("renderiza imagem, título, preço e botão", () => {
        render(<ProductCard
            product={productMock}
            addToCart={addToCartMock}
        />)

        // screen.logTestingPlaygroundURL()

        const image = screen.getByRole('img', {
            name: /jaqueta/i
        })

        const title = screen.getByRole('heading', {
            name: /jaqueta/i
        })

        const price = screen.getByText(/\$55\.99/i)

        const button = screen.getByRole('button', {
            name: /buy/i
        })

        expect(image).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(price).toBeInTheDocument()
        expect(button).toBeInTheDocument()
    })
    test('quando o botão for clicado o produto seja adicionado ao carrinho', async () => { 
        const user = userEvent.setup()

        render(<ProductCard
            product={productMock}
            addToCart={addToCartMock}
        />)

        const button = screen.getByRole('button', {
            name: /buy/i
        })

        await user.click(button)

        // expect(addToCartMock).toBeCalled()
        // expect(addToCartMock).toHaveBeenCalledWith(productMock)
        // expect(addToCartMock).toBeCalledTimes(1)
        expect(addToCartMock).toReturn()
    })
})