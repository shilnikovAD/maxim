import db from './db/database';

// Seed categories
const categories = [
  { name: 'Завтраки', slug: 'breakfast' },
  { name: 'Обеды', slug: 'lunch' },
  { name: 'Ужины', slug: 'dinner' },
  { name: 'Десерты', slug: 'desserts' },
  { name: 'Быстрые блюда', slug: 'quick' },
  { name: 'Салаты', slug: 'salads' },
  { name: 'Супы', slug: 'soups' },
  { name: 'Выпечка', slug: 'baking' }
];

const recipes = [
  {
    title: 'Омлет с сыром',
    description: 'Классический французский омлет с сыром и зеленью',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400',
    category_slug: 'breakfast',
    time: 15,
    ingredients: ['яйца', 'сыр', 'молоко', 'масло сливочное', 'соль', 'перец', 'зелень'],
    steps: [
      'Взбейте яйца с молоком, солью и перцем',
      'Растопите масло на сковороде',
      'Вылейте яичную смесь и готовьте на среднем огне',
      'Когда омлет схватится снизу, добавьте тертый сыр',
      'Сложите омлет пополам и подавайте с зеленью'
    ]
  },
  {
    title: 'Куриная грудка с овощами',
    description: 'Сочная куриная грудка запеченная с сезонными овощами',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400',
    category_slug: 'dinner',
    time: 45,
    ingredients: ['куриная грудка', 'помидоры', 'перец болгарский', 'лук', 'чеснок', 'оливковое масло', 'специи'],
    steps: [
      'Нарежьте овощи крупными кусками',
      'Замаринуйте курицу в специях и масле на 20 минут',
      'Выложите овощи и курицу на противень',
      'Запекайте в духовке при 200°C 25-30 минут',
      'Подавайте горячим с гарниром'
    ]
  },
  {
    title: 'Салат Цезарь',
    description: 'Классический салат Цезарь с курицей и соусом',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
    category_slug: 'salads',
    time: 25,
    ingredients: ['салат романо', 'куриная грудка', 'пармезан', 'гренки', 'соус цезарь', 'помидоры черри'],
    steps: [
      'Отварите или обжарьте куриную грудку',
      'Нарвите листья салата руками',
      'Нарежьте курицу кусочками',
      'Соберите салат: листья, курица, гренки, помидоры',
      'Полейте соусом и посыпьте тертым пармезаном'
    ]
  },
  {
    title: 'Борщ',
    description: 'Традиционный украинский борщ со сметаной',
    image: 'https://images.unsplash.com/photo-1550305080-4e029753abcf?w=400',
    category_slug: 'soups',
    time: 120,
    ingredients: ['говядина', 'свекла', 'капуста', 'картофель', 'морковь', 'лук', 'томатная паста', 'чеснок', 'зелень', 'сметана'],
    steps: [
      'Сварите мясной бульон из говядины',
      'Нарежьте овощи: свеклу, капусту, картофель, морковь, лук',
      'Обжарьте лук, морковь и свеклу с томатной пастой',
      'Добавьте в бульон картофель, затем капусту',
      'Добавьте зажарку и варите до готовности',
      'Подавайте со сметаной и зеленью'
    ]
  },
  {
    title: 'Паста Карбонара',
    description: 'Итальянская паста с беконом и сливочным соусом',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400',
    category_slug: 'quick',
    time: 20,
    ingredients: ['спагетти', 'бекон', 'яйца', 'пармезан', 'чеснок', 'черный перец'],
    steps: [
      'Отварите спагетти до состояния аль денте',
      'Обжарьте бекон с чесноком',
      'Взбейте яйца с тертым пармезаном',
      'Снимите сковороду с огня и добавьте горячую пасту',
      'Быстро добавьте яичную смесь и перемешайте',
      'Подавайте с перцем и дополнительным пармезаном'
    ]
  },
  {
    title: 'Шоколадный торт',
    description: 'Нежный шоколадный торт с кремом',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
    category_slug: 'desserts',
    time: 90,
    ingredients: ['мука', 'какао', 'сахар', 'яйца', 'масло', 'молоко', 'разрыхлитель', 'шоколад', 'сливки'],
    steps: [
      'Смешайте сухие ингредиенты: муку, какао, сахар, разрыхлитель',
      'Добавьте яйца, растопленное масло и молоко',
      'Выпекайте коржи при 180°C 25-30 минут',
      'Приготовьте крем из шоколада и сливок',
      'Соберите торт, промазывая коржи кремом',
      'Украсьте по желанию и охладите перед подачей'
    ]
  },
  {
    title: 'Овсяная каша с ягодами',
    description: 'Полезный завтрак с овсянкой и свежими ягодами',
    image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400',
    category_slug: 'breakfast',
    time: 10,
    ingredients: ['овсяные хлопья', 'молоко', 'мед', 'ягоды', 'орехи', 'банан'],
    steps: [
      'Сварите овсяные хлопья в молоке',
      'Добавьте мед по вкусу',
      'Выложите кашу в тарелку',
      'Украсьте свежими ягодами, орехами и бананом'
    ]
  },
  {
    title: 'Греческий салат',
    description: 'Свежий салат с овощами и сыром фета',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
    category_slug: 'salads',
    time: 15,
    ingredients: ['помидоры', 'огурцы', 'перец', 'лук красный', 'фета', 'оливки', 'оливковое масло', 'орегано'],
    steps: [
      'Нарежьте овощи крупными кусками',
      'Нарежьте фету кубиками',
      'Соедините овощи, фету и оливки',
      'Заправьте оливковым маслом и орегано',
      'Подавайте сразу'
    ]
  },
  {
    title: 'Блины с творогом',
    description: 'Тонкие блины с нежной творожной начинкой',
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400',
    category_slug: 'breakfast',
    time: 40,
    ingredients: ['мука', 'молоко', 'яйца', 'сахар', 'творог', 'сметана', 'ваниль'],
    steps: [
      'Приготовьте тесто из муки, молока, яиц и сахара',
      'Выпекайте тонкие блины на сковороде',
      'Смешайте творог со сметаной, сахаром и ванилью',
      'Заверните творожную начинку в блины',
      'Подавайте со сметаной или вареньем'
    ]
  },
  {
    title: 'Куриный суп с лапшой',
    description: 'Легкий домашний суп с курицей и лапшой',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',
    category_slug: 'soups',
    time: 50,
    ingredients: ['курица', 'лапша', 'морковь', 'лук', 'картофель', 'зелень', 'специи'],
    steps: [
      'Сварите куриный бульон',
      'Достаньте курицу и нарежьте кусочками',
      'Добавьте в бульон нарезанные овощи',
      'За 5 минут до готовности добавьте лапшу',
      'Верните курицу в суп',
      'Подавайте с зеленью'
    ]
  }
];

// Clear existing data
db.exec('DELETE FROM favorites');
db.exec('DELETE FROM recipes');
db.exec('DELETE FROM categories');

// Insert categories
const insertCategory = db.prepare('INSERT INTO categories (name, slug) VALUES (?, ?)');
categories.forEach(cat => {
  insertCategory.run(cat.name, cat.slug);
});

// Get category IDs
const getCategoryId = db.prepare('SELECT id FROM categories WHERE slug = ?');

// Insert recipes
const insertRecipe = db.prepare(`
  INSERT INTO recipes (title, description, image, category_id, time, ingredients, steps)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

recipes.forEach(recipe => {
  const category = getCategoryId.get(recipe.category_slug) as { id: number } | undefined;
  insertRecipe.run(
    recipe.title,
    recipe.description,
    recipe.image,
    category?.id || null,
    recipe.time,
    JSON.stringify(recipe.ingredients),
    JSON.stringify(recipe.steps)
  );
});

console.log('Database seeded successfully!');
console.log(`Inserted ${categories.length} categories`);
console.log(`Inserted ${recipes.length} recipes`);
