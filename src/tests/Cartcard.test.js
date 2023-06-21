import { render, screen } from "@testing-library/react"
import CartCard from "../components/Cart/CartCard"
import userEvent from "@testing-library/user-event"

const productMock = {
    id: "1",
    title: "Jaqueta",
    price: 55.99,
    quantity: 1,
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
}

const removeFromCartMock = jest.fn()

describe("Cart Card", () => {
    test("renderiza imagem, título, preço e botão", () => {
        render(<CartCard
            product={productMock}
            removeFromCart={removeFromCartMock}
        />)

        // screen.logTestingPlaygroundURL()

        const image = screen.getByRole('img', {
            name: /jaqueta/i
        })

        const title = screen.getByRole('heading', {
            name: /jaqueta/i
        })

        const price = screen.getByText(/\$55\.99/i)
        const quantity = screen.getByText(/x/i)
        const button = screen.getByRole('button', {
            name: /remove/i
        })

        expect(image).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(price).toBeInTheDocument()
        expect(quantity).toBeInTheDocument()
        expect(button).toBeInTheDocument()
    })
    test("quando o botão for clicado o produto seja removido do carrinho", async () => {
        const user = userEvent.setup()

        render(<CartCard
            product={productMock}
            removeFromCart={removeFromCartMock}
        />)
        
        const button = screen.getByRole('button', {
            name: /remove/i
        })
        await user.click(button)

        expect(removeFromCartMock).toBeCalled()
    })
})
