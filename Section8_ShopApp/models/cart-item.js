class CartItem {
  constructor(quantity, price, title, sumTotal) {
    this.productPrice = price;
    this.productTitle = title;
    this.quantity = quantity;
    this.sumTotal = sumTotal;
  }
}
export default CartItem;
