package org.upyog.Automation.Common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;
import org.upyog.Automation.Modules.Adv.AdvBookingCreate;
import org.upyog.Automation.Modules.Pet.PetCreateApplication;
import org.upyog.Automation.Modules.StreetVending.CreateApplication;
import org.upyog.Automation.Modules.TradeLicense.TradeLicenseCreate;
import org.upyog.Automation.Modules.RequestService.TreePruningCitizen;
import org.upyog.Automation.Modules.RequestService.WaterTankerCitizen;
import org.upyog.Automation.Modules.RequestService.MobileToiletCitizen;

@Component
public class CommonCitizenTest {

    private static final Logger logger = LoggerFactory.getLogger(CommonCitizenTest.class);

    @Autowired
    private ApplicationContext context;

    public void runCitizenTest(String baseUrl, String moduleName, String mobileNumber, String otp, String cityName) {
        logger.info("Starting {} citizen test", moduleName);

        try {
            if ("STREET_VENDING".equalsIgnoreCase(moduleName)) {
                CreateApplication svApp = context.getBean(CreateApplication.class);
                svApp.svCreateApplication(baseUrl, moduleName, mobileNumber, otp, cityName);

            } else if ("TRADE_LICENSE".equalsIgnoreCase(moduleName)) {
                TradeLicenseCreate tlApp = context.getBean(TradeLicenseCreate.class);
                tlApp.TradeLicenceCitizenReg(baseUrl, moduleName, mobileNumber, otp, cityName);

            } else if ("PET_REGISTRATION".equalsIgnoreCase(moduleName)) {
                PetCreateApplication petApp = context.getBean(PetCreateApplication.class);
                petApp.PetApptest(baseUrl, moduleName, mobileNumber, otp, cityName);

            } else if ("ADVERTISEMENT".equalsIgnoreCase(moduleName)) {
                AdvBookingCreate advApp = context.getBean(AdvBookingCreate.class);
                advApp.AdvBookingReg(baseUrl, moduleName, mobileNumber, otp, cityName);

            }else if ("TREE_PRUNING".equalsIgnoreCase(moduleName)) {

                TreePruningCitizen treePruningApp = context.getBean(TreePruningCitizen.class);
                treePruningApp.TreePruningCreate(baseUrl, moduleName, mobileNumber, otp, cityName);

            } else if ("WATER_TANKER".equalsIgnoreCase(moduleName)) {
                WaterTankerCitizen waterTankerApp = context.getBean(WaterTankerCitizen.class);
                waterTankerApp.WaterTankerCreate(baseUrl, moduleName, mobileNumber, otp, cityName);

            } else if ("MOBILE_TOILET".equalsIgnoreCase(moduleName)) {
                MobileToiletCitizen mobileToiletApp = context.getBean(MobileToiletCitizen.class);
                mobileToiletApp.MobileToiletCreate(baseUrl, moduleName, mobileNumber, otp, cityName);
            }
            else {
                logger.error("Unknown module: {}", moduleName);
                throw new RuntimeException("Unknown module: " + moduleName);
            }

            logger.info("{} test completed", moduleName);

        } catch (Exception e) {
            logger.error("Error in {} test: {}", moduleName, e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
