let itemCount = 0;

function addItem() {
  itemCount++;
  const div = document.createElement("div");
  div.id = "item" + itemCount;
  div.innerHTML = `
    <input id="name${itemCount}" placeholder="Item Name">
    <input id="qty${itemCount}" type="number" placeholder="Qty">
    <input id="price${itemCount}" type="number" placeholder="Price">
    <button onclick="document.getElementById('item${itemCount}').remove()">Remove</button>
  `;
  document.getElementById("items").appendChild(div);
}

function generateReceipt() {
  let subtotal = 0, totalItems = 0;
  let receipt = "-------------------------------\nSHOPPING BILL\n-------------------------------\n";
  receipt += `Receipt No: ${Math.floor(Math.random()*10000)}\n-------------------------------\n`;
  receipt += "Item            Qty     Price\n-------------------------------\n";

  for (let i = 1; i <= itemCount; i++) {
    const name = document.getElementById("name"+i);
    const qty = document.getElementById("qty"+i);
    const price = document.getElementById("price"+i);
    if (name && qty && price && name.value && qty.value && price.value) {
      const lineTotal = qty.value * price.value;
      subtotal += lineTotal;
      totalItems += Number(qty.value);
      receipt += `${name.value.padEnd(15)} ${qty.value.padEnd(5)} ${lineTotal.toFixed(2)}\n`;
    }
  }

  const tax = subtotal * 0.05, total = subtotal + tax;
  receipt += "-------------------------------\n";
  receipt += `No. of items         ${totalItems}\n`;
  receipt += `Subtotal               ${subtotal.toFixed(2)}\n`;
  receipt += `Tax (5%)               ${tax.toFixed(2)}\n`;
  receipt += `Total Amount          ${total.toFixed(2)}\n`;
  receipt += "-------------------------------\nThank you for shopping!\nVisit us again!\n-------------------------------";

  document.getElementById("receipt").innerText = receipt;
}

function printReceipt() {
  const win = window.open("", "", "width=400,height=600");
  win.document.write("<pre>" + document.getElementById("receipt").innerText + "</pre>");
  win.print();
}
