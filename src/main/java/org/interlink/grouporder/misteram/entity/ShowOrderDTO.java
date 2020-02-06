package org.interlink.grouporder.misteram.entity;

import lombok.Getter;
import lombok.Setter;
import org.interlink.grouporder.core.entity.MemberOrder;

import java.util.List;

@Getter
@Setter
public class ShowOrderDTO {
    List<MemberOrder> members;
    int fullPrice;
}
