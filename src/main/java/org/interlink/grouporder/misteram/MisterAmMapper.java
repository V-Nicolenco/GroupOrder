package org.interlink.grouporder.misteram;

import org.interlink.grouporder.core.entity.GroupOrder;
import org.interlink.grouporder.core.entity.MemberOrder;
import org.interlink.grouporder.core.entity.Product;
import org.interlink.grouporder.misteram.entity.GroupOrderDTO;
import org.interlink.grouporder.misteram.entity.MemberOrderDTO;
import org.interlink.grouporder.misteram.entity.StringResultDTO;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;

public class MisterAmMapper {

    private MisterAmMapper() {
    }

    private static final ModelMapper mapper = new ModelMapper();

    public static <T> T map(Object object, Class<T> objectClass) {
        return mapper.map(object, objectClass);
    }

    public static StringResultDTO map(String url, String name, StringResultDTO destination) {
        destination.setRestaurantUrl(url);
        destination.setRestaurantName(name);
        return destination;
    }

    public static GroupOrder map(String code, GroupOrder destination, GroupOrderDTO source) {
        destination.setCode(code);
        destination.setRestaurantId(source.getRestaurantId());
        destination.setRestaurantName(source.getRestaurantName());
        destination.setRestaurantUrl(source.getRestaurantUrl());
        destination.setLocked(false);
//        destination.setFullPrice(0);

        return destination;
    }

    public static MemberOrder map(MemberOrder destination, MemberOrderDTO source) {
        List<Product> products = source.getItems().stream()
                .map(item -> map(item, Product.class))
                .collect(Collectors.toList());


        destination.setName(source.getName());
        destination.setEmail(source.getEmail());
        destination.setProducts(products);
        destination.setRestaurantId(source.getCompanyId());
        destination.setOrderPrice(source.getFullPrice());

        return destination;
    }
}
