drop database onlineBookstore;


use onlineBookstore;
create database onlineBookstore;


Drop table if exists Books;
Create table Books( 
	Book_ID SERIAL PRIMARY KEY,
	Title VARCHAR(100),
	Author VARCHAR(100),
	Genre VARCHAR(50),
	Published_Year INT,
	Price NUMERIC(10, 2),
	Stock INT
);

Drop table if exists customers;
Create table customers(
	Customer_ID SERIAL PRIMARY KEY,
	Name VARCHAR(100),
	Email VARCHAR(100),
	Phone VARCHAR(15),
	City VARCHAR(50),
	Country VARCHAR(150)
);

Drop table if exists orders;
Create table orders(
	Order_ID SERIAL PRIMARY KEY,
	Customer_ID INT REFERENCES Customers(Customer_ID),
	Book_ID INT REFERENCES Books (Book_ID),
	Order_Date DATE,
	Quantity INT,
	Total_Amount NUMERIC(10, 2)
);

select * from Books;
select *from customers;
select * from orders;


-- Basic queries:

select * from Books where genre='fiction';

select * from Books where Published_year>'1950';

select * from customers where country='canada';

select * from orders where order_date between '2023-11-01' and '2023-11-30';

select sum(stock) as t_stock from Books; 

select max(Price) as H_price from Books;

select * from Books order by price desc;

select * from Books order by price desc limit 1;

select * from orders where quantity>1;

select * from orders where total_amount>20;

select distinct genre from books;

select * from books order by stock;

select  sum(total_amount) as t_amount from orders;


-- Advance Queries:

select b.genre, sum(o.quantity) as t_books_sold from orders o join books b 
on o.book_id = b.book_id group by b.genre;

select avg(price) as avg_price from books where genre ='fantasy';

select c.name , o.quantity from orders o join customers c
on c.customer_id=o.customer_id ; 

select customer_id, count(order_id) as order_count
from orders 
group by customer_id
having count(order_id)>=2;

select o.customer_id, c.name, count(order_id) as order_count
from orders o
join customers c on c.customer_id= o.customer_id
group by o.customer_id
having count(order_id)>=2;

select o.book_id,b.title, count(o.order_id) as order_count
from orders o
join books b on b.book_id=o.book_id
group by book_id 
order by order_count desc;

select * from books where genre='Fantasy'
order by price desc limit 3;

select b.author,sum(o.quantity) as T_bookssold
from orders o 
join books b on o.book_id=b.book_id
group by b.author;

select distinct c.city, o.total_amount
from customers c join orders o
on c.customer_id=o.customer_id
where o.total_amount >30
order by total_amount;

select  c.name, o.total_amount
from customers c join orders o on c.customer_id=o.customer_id;

select c.customer_id, c.name, sum(o.total_amount) as t_spend
from customers c join orders o on c.customer_id=o.customer_id
group by c.customer_id ,c.name
order by t_spend desc;

select b.book_id,b.title,b.stock, coalesce(sum(o.quantity),0)
as order_quantity, b.stock- coalesce(sum(o.quantity),0) 
AS remaining_quantity
from  books b left join orders o  on b.book_id=o.book_id
group by b.book_id
order by b.book_id;
