import dayjs from 'dayjs';
import * as advancedFormat from 'dayjs/plugin/advancedFormat';
class Order {
  constructor(id, items, amount, date) {
    this.id = id;
    this.items = items;
    this.amount = amount;
    this.date = date;
  }
  get readableDate() {
    dayjs.extend(advancedFormat);
    return dayjs(this.date).format('MMMM Do YYYY, hh:mm');
  }
}
export default Order;
