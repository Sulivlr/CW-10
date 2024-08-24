create schema news collate utf8mb4_general_ci;
use news;

create table news
(
    id         int auto_increment
        primary key,
    title      varchar(255)                       not null,
    content    text                               not null,
    image      varchar(255)                       null,
    created_at datetime default CURRENT_TIMESTAMP null
);

create table commentaries
(
    id         int auto_increment
        primary key,
    news_id    int          not null,
    author     varchar(255) null,
    commentary text         not null,
    constraint commentaries_news_id_fk
        foreign key (news_id) references news (id)
);


insert into news.news (id, title, content, image, created_at)
values  (1, 'Winter', 'Today is very snowwy', '1.jpg', '2024-08-24 12:52:14'),
        (2, 'rainyyy', 'today is very rainy ', '2.jpg', '2024-08-24 12:52:14'),
        (3, 'shinee', 'shinee day', '3.jpg', '2024-08-24 12:52:14');

        insert into news.commentaries (id, news_id, author, commentary)
        values  (2, 1, 'Alikhan', 'I was the one who posted that'),
                (3, 2, 'Sultan', 'i dont like rain'),
                (4, 3, 'Timur', 'wohoo shinee day');