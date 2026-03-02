<?php

function generateReceipt($items) {

    echo "Output:\n\n";
    echo "QTY DESC\tAMT\tTotal\n";
    echo "------------------------------------\n";

    $overallTotal = 0;

    foreach ($items as $item) {

        $qty  = $item['qty'];
        $desc = $item['desc'];
        $amt  = $item['amt'];

        $total = $qty * $amt;
        $overallTotal += $total;

        echo "(" . $qty . ")" . $desc . "\t" . $amt . "\t" . $total . "\n";
    }

    echo "---------------------------------\n";
    echo "Overall Total\t\tPhp " . $overallTotal . "\n";
    }

$groceryList = array(
    array("qty" => 2, "desc" => "ITEM 1", "amt" => 100),
    array("qty" => 7, "desc" => "ITEM 2", "amt" => 35),
    array("qty" => 1, "desc" => "ITEM 3", "amt" => 350),
    array("qty" => 2, "desc" => "ITEM 4", "amt" => 20)
);

generateReceipt($groceryList);

?>
