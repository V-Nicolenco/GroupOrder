package org.interlink.grouporder.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Getter;
import lombok.Setter;
import org.interlink.grouporder.core.entity.view.GroupOrderView;

@Getter
@Setter
public class GroupOrder {

    @JsonView(GroupOrderView.Basic.class)
    private String code;
    private String restaurantName;
    private String restaurantUrl;

    private int restaurantId;
    private int fullPrice;

    @JsonIgnore
    private boolean isLocked = false;

    public GroupOrder(String code, String restaurantName, String restaurantUrl) {
        this.code = code;
        this.restaurantName = restaurantName;
        this.restaurantUrl = restaurantUrl;
    }
}
