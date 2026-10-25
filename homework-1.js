const readline = require('node:readline/promises')

function ticketPrice(category) {
  switch (category) {
    case 1:
      return 300
    case 2:
      return 500
    case 3:
      return 900
    default:
      return 0
  }
}

function maxTickets(budget, price) {
  if (price === 0) return 0
  let count = 0
  let currentBudget = budget
  while (currentBudget >= price) {
    currentBudget -= price
    count++
  }
  return count
}

function printTicketResult(category, budget) {
  const price = ticketPrice(category)
  if (price === 0) {
    console.log('неизвестная категория')
    return
  }
  const count = maxTickets(budget, price)
  console.log(`Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${count} шт.`)
}


function deliveryPrice(distance, total) {
  if (total >= 3000) {
    return 0
  }
  if (distance <= 3) {
    return 0
  }
  if (distance <= 10) {
    return 200
  }
  return 200 + (distance - 10) * 25
}

function printDelivery(distance, total) {
  const delivery = deliveryPrice(distance, total)
  console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${delivery} руб.`)
}


function printSteps(height) {
  let count = 0
  for (let i = 1; i <= height; i++) {
    if (i === 4) {
      continue
    }
    if (i > 10) {
      console.log('Дальше лестница не построена')
      break
    }
    console.log(`Ступень ${i}`)
    count++
  }
  console.log(`Всего построено: ${count}`)
}


async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  console.log('Выберите задачу:')
  console.log('1 — билетная касса')
  console.log('2 — доставка заказа')
  console.log('3 — лестница') 
  
  const action = Number(await rl.question('Ваш выбор: '))

  switch (action) {
    case 1: {
      const category = Number(await rl.question('Категория билета: '))
      const budget = Number(await rl.question('Бюджет: '))
      printTicketResult(category, budget)
      break
    }
    case 2: {
      const distance = Number(await rl.question('Расстояние: '))
      const total = Number(await rl.question('Сумма заказа: '))
      printDelivery(distance, total)
      break
    }
    case 3: {
      const height = Number(await rl.question('Высота лестницы: '))
      printSteps(height)
      break
    }
    default:
      console.log('такой задачи нет')
  }

  rl.close()
}

main()
