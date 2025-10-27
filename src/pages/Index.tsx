import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  material: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Классический налобный ремень",
    price: 3500,
    image: "https://cdn.poehali.dev/projects/b17fba97-584c-48b5-80e7-eea1e7523370/files/af02f00f-22a5-46f0-a91a-9ab141089bb0.jpg",
    size: "Full",
    color: "Коричневый",
    material: "Кожа"
  },
  {
    id: 2,
    name: "Премиум с кристаллами",
    price: 5900,
    image: "https://cdn.poehali.dev/projects/b17fba97-584c-48b5-80e7-eea1e7523370/files/9cafde78-0ba0-4f79-a1c6-ea7c84a71411.jpg",
    size: "Full",
    color: "Черный",
    material: "Кожа"
  },
  {
    id: 3,
    name: "Бархатный налобник",
    price: 4200,
    image: "https://cdn.poehali.dev/projects/b17fba97-584c-48b5-80e7-eea1e7523370/files/8547cd09-401e-40a0-b2fe-43dd0fd5deaf.jpg",
    size: "Cob",
    color: "Бордовый",
    material: "Бархат"
  },
  {
    id: 4,
    name: "Спортивный ремень",
    price: 3200,
    image: "https://cdn.poehali.dev/projects/b17fba97-584c-48b5-80e7-eea1e7523370/files/af02f00f-22a5-46f0-a91a-9ab141089bb0.jpg",
    size: "Cob",
    color: "Черный",
    material: "Синтетика"
  },
  {
    id: 5,
    name: "Элегантный с декором",
    price: 4800,
    image: "https://cdn.poehali.dev/projects/b17fba97-584c-48b5-80e7-eea1e7523370/files/9cafde78-0ba0-4f79-a1c6-ea7c84a71411.jpg",
    size: "Full",
    color: "Коричневый",
    material: "Кожа"
  },
  {
    id: 6,
    name: "Базовый налобник",
    price: 2900,
    image: "https://cdn.poehali.dev/projects/b17fba97-584c-48b5-80e7-eea1e7523370/files/af02f00f-22a5-46f0-a91a-9ab141089bb0.jpg",
    size: "Pony",
    color: "Черный",
    material: "Синтетика"
  }
];

const Index = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const sizes = ["Full", "Cob", "Pony"];
  const colors = ["Черный", "Коричневый", "Бордовый"];
  const materials = ["Кожа", "Бархат", "Синтетика"];

  const toggleFilter = (value: string, selected: string[], setter: (val: string[]) => void) => {
    if (selected.includes(value)) {
      setter(selected.filter(v => v !== value));
    } else {
      setter([...selected, value]);
    }
  };

  const filteredProducts = products.filter(product => {
    const sizeMatch = selectedSizes.length === 0 || selectedSizes.includes(product.size);
    const colorMatch = selectedColors.length === 0 || selectedColors.includes(product.color);
    const materialMatch = selectedMaterials.length === 0 || selectedMaterials.includes(product.material);
    return sizeMatch && colorMatch && materialMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Equine Elegance</h1>
            
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => setActiveSection("home")}
                className={`text-sm font-medium transition-colors ${activeSection === "home" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                Главная
              </button>
              <button 
                onClick={() => setActiveSection("catalog")}
                className={`text-sm font-medium transition-colors ${activeSection === "catalog" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                Каталог
              </button>
              <button 
                onClick={() => setActiveSection("about")}
                className={`text-sm font-medium transition-colors ${activeSection === "about" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                О нас
              </button>
              <button 
                onClick={() => setActiveSection("delivery")}
                className={`text-sm font-medium transition-colors ${activeSection === "delivery" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                Доставка
              </button>
              <button 
                onClick={() => setActiveSection("contacts")}
                className={`text-sm font-medium transition-colors ${activeSection === "contacts" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                Контакты
              </button>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeFromCart(index)}
                          >
                            <Icon name="X" size={16} />
                          </Button>
                        </div>
                      ))}
                      <div className="border-t border-border pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold">Итого:</span>
                          <span className="text-xl font-bold text-primary">{totalPrice} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {activeSection === "home" && (
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-5xl font-bold mb-6">Налобные ремни премиум-класса</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Качественная амуниция для лошадей от ведущих производителей. 
              Элегантность и комфорт в каждой детали.
            </p>
            <Button size="lg" onClick={() => setActiveSection("catalog")}>
              Смотреть каталог
            </Button>
          </div>
        </section>
      )}

      {activeSection === "catalog" && (
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-8">
              <aside className="md:w-64 space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 text-foreground">Размер</h3>
                  <div className="space-y-2">
                    {sizes.map(size => (
                      <div key={size} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`size-${size}`}
                          checked={selectedSizes.includes(size)}
                          onCheckedChange={() => toggleFilter(size, selectedSizes, setSelectedSizes)}
                        />
                        <Label htmlFor={`size-${size}`} className="cursor-pointer">{size}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-foreground">Цвет</h3>
                  <div className="space-y-2">
                    {colors.map(color => (
                      <div key={color} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`color-${color}`}
                          checked={selectedColors.includes(color)}
                          onCheckedChange={() => toggleFilter(color, selectedColors, setSelectedColors)}
                        />
                        <Label htmlFor={`color-${color}`} className="cursor-pointer">{color}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-foreground">Материал</h3>
                  <div className="space-y-2">
                    {materials.map(material => (
                      <div key={material} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`material-${material}`}
                          checked={selectedMaterials.includes(material)}
                          onCheckedChange={() => toggleFilter(material, selectedMaterials, setSelectedMaterials)}
                        />
                        <Label htmlFor={`material-${material}`} className="cursor-pointer">{material}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {(selectedSizes.length > 0 || selectedColors.length > 0 || selectedMaterials.length > 0) && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSelectedSizes([]);
                      setSelectedColors([]);
                      setSelectedMaterials([]);
                    }}
                  >
                    Сбросить фильтры
                  </Button>
                )}
              </aside>

              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-8">Каталог товаров</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                      <div className="aspect-square overflow-hidden bg-muted">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-5 space-y-3">
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <div className="flex gap-2 flex-wrap">
                          <Badge variant="outline" className="text-xs">{product.size}</Badge>
                          <Badge variant="outline" className="text-xs">{product.color}</Badge>
                          <Badge variant="outline" className="text-xs">{product.material}</Badge>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xl font-bold text-primary">{product.price} ₽</span>
                          <Button onClick={() => addToCart(product)} size="sm">
                            <Icon name="ShoppingCart" size={16} className="mr-2" />
                            В корзину
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">По выбранным фильтрам ничего не найдено</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {activeSection === "about" && (
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8 text-center">О нас</h2>
            <div className="prose prose-lg mx-auto">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Equine Elegance — специализированный магазин амуниции премиум-класса для лошадей. 
                Мы работаем с 2018 года и предлагаем только качественные налобные ремни от проверенных производителей.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mt-4">
                Каждый продукт в нашем каталоге тщательно отобран и проверен на прочность, комфорт и стиль. 
                Мы понимаем, что амуниция — это не только функциональный элемент, но и способ подчеркнуть 
                индивидуальность вашей лошади.
              </p>
            </div>
          </div>
        </section>
      )}

      {activeSection === "delivery" && (
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8 text-center">Доставка</h2>
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex gap-4">
                  <Icon name="Truck" size={24} className="text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Доставка по России</h3>
                    <p className="text-muted-foreground">
                      Отправляем заказы через СДЭК и Почту России. Срок доставки 3-7 дней в зависимости от региона.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex gap-4">
                  <Icon name="MapPin" size={24} className="text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Самовывоз</h3>
                    <p className="text-muted-foreground">
                      Возможен самовывоз из нашего офиса в Москве. Адрес уточняйте у менеджера.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex gap-4">
                  <Icon name="Package" size={24} className="text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Бесплатная доставка</h3>
                    <p className="text-muted-foreground">
                      При заказе от 10 000 рублей доставка по России бесплатная.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {activeSection === "contacts" && (
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8 text-center">Контакты</h2>
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex gap-4">
                  <Icon name="Phone" size={24} className="text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Телефон</h3>
                    <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex gap-4">
                  <Icon name="Mail" size={24} className="text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Email</h3>
                    <p className="text-muted-foreground">info@equine-elegance.ru</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex gap-4">
                  <Icon name="Clock" size={24} className="text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Время работы</h3>
                    <p className="text-muted-foreground">Пн-Пт: 9:00 - 18:00<br />Сб-Вс: выходной</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-border py-8 mt-20">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>© 2024 Equine Elegance. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
