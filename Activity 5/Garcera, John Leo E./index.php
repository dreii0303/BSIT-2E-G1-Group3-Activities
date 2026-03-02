<?php

function generateReceipt($items) {
    $overallTotal = 0;

    echo "<pre>";
    echo "QTY   DESC      AMT     Total\n";
    echo "-----------------------------------\n";

    foreach ($items as $item) {
        $qty = $item['qty'];
        $desc = $item['desc'];
        $amt = $item['amt'];

        $total = $qty * $amt;
        $overallTotal += $total;

        printf("(%d)  %-8s  %-6d  %-6d\n", $qty, $desc, $amt, $total);
    }

    echo "-----------------------------------\n";
    echo "Overall Total: Php " . $overallTotal . "\n";
    echo "</pre>";
}

// Items List
$items = [
    ['qty' => 2, 'desc' => 'ITEM 1', 'amt' => 100],
    ['qty' => 7, 'desc' => 'ITEM 2', 'amt' => 35],
    ['qty' => 1, 'desc' => 'ITEM 3', 'amt' => 350],
    ['qty' => 2, 'desc' => 'ITEM 4', 'amt' => 20],
];

// Call the function
generateReceipt($items);

?>
