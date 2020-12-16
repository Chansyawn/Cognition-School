package com.ash.softwareback.entity;

import javax.persistence.*;

@Entity
@Table(name = "Test_item", schema = "softwareWX", catalog = "")
public class TestItemEntity {
    private int testItemId;
    private String testName;
    private String testType;
    private String deleteFlag;

    @Id
    @Column(name = "Test_item_id")
    public int getTestItemId() {
        return testItemId;
    }

    public void setTestItemId(int testItemId) {
        this.testItemId = testItemId;
    }

    @Basic
    @Column(name = "Test_name")
    public String getTestName() {
        return testName;
    }

    public void setTestName(String testName) {
        this.testName = testName;
    }

    @Basic
    @Column(name = "test_type")
    public String getTestType() {
        return testType;
    }

    public void setTestType(String testType) {
        this.testType = testType;
    }

    @Basic
    @Column(name = "delete_flag")
    public String getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(String deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TestItemEntity that = (TestItemEntity) o;

        if (testItemId != that.testItemId) return false;
        if (testName != null ? !testName.equals(that.testName) : that.testName != null) return false;
        if (testType != null ? !testType.equals(that.testType) : that.testType != null) return false;
        if (deleteFlag != null ? !deleteFlag.equals(that.deleteFlag) : that.deleteFlag != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = testItemId;
        result = 31 * result + (testName != null ? testName.hashCode() : 0);
        result = 31 * result + (testType != null ? testType.hashCode() : 0);
        result = 31 * result + (deleteFlag != null ? deleteFlag.hashCode() : 0);
        return result;
    }
}