import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
class Order {
  constructor(id, items, amount, date) {
    dayjs.extend(advancedFormat);
    this.id = id;
    this.items = items;
    this.amount = amount;
    this.date = date;
  }
  get readableDate() {
    return dayjs(this.date).format('MMMM Do YYYY, hh:mm');
  }
}
export default Order;
