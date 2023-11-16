<?php

function getRequestResult($request){
    $ch=curl_init();
    curl_setopt($ch,CURLOPT_URL,$request);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $server_output = curl_exec($ch);
    curl_close($ch);
    return $server_output;
}
$org_url='https://yandex.ru/maps/org/170868117843/reviews/';
$html=getRequestResult($org_url);

$pos=strpos($html,'<div class="reviews-view__reviews">');
$part=substr($html,$pos);
$pos2=strpos($part, '</section>');
$part2=substr($part,0,$pos2);

require_once("simple_html_dom.php");
$html=str_get_html($part2);
if(count($html->find('.business-review-view'))){
    foreach($html->find('.business-review-view') as $div){
        //Значит, нашли отзыв
        $review=[];
        //Ищем автора
        if(count($div->find('.business-review-view__author a'))){
            $reviewAuthor=$div->find('.business-review-view__author a span')[0]->innertext;
            $review['author']=$reviewAuthor;
        }
        if(count($div->find('.business-review-view__author meta'))){
            $reviewImage=$div->find('.business-review-view__author meta')[0]->content;
            $review['image']=$reviewImage;
        }
        if(count($div->find('.business-review-view__date'))){
            $reviewDate=$div->find('.business-review-view__date meta')[0]->content;
            $review['date']=$reviewDate;
        }
        if(count($div->find('.business-review-view__body-text'))){
            $reviewText=$div->find('.business-review-view__body-text')[0]->innertext;
            $review['text']=$reviewText;
        }
        $reviews[]=$review;
        echo $review;
    }
}
echo $reviews;
?>