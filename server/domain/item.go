package domain

type Item struct {
	Id          uint   `json:"id"`
	Title       string `json:"title" gorm:"unique"`
	Description string `json:"description"`
	Closed      bool   `json:"closed"`
}
